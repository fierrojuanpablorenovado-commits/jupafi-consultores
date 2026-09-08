from __future__ import annotations

import argparse
import math
import queue
import sys
import time
import webbrowser
from collections import deque

import numpy as np
import sounddevice as sd

DEFAULT_URL = "https://jupaficonsultores.com/control/jarvis"
SAMPLE_RATE = 16000
BLOCK_SIZE = 1024


class ClapDetector:
    """Lightweight local double-clap detector.

    It looks for short high-energy transients separated by a human clap interval.
    No audio leaves the computer and no audio is stored.
    """

    def __init__(
        self,
        min_interval: float = 0.14,
        max_interval: float = 0.85,
        refractory: float = 0.10,
        energy_multiplier: float = 5.0,
        min_rms: float = 0.06,
    ) -> None:
        self.min_interval = min_interval
        self.max_interval = max_interval
        self.refractory = refractory
        self.energy_multiplier = energy_multiplier
        self.min_rms = min_rms
        self.last_peak = 0.0
        self.peaks: deque[float] = deque(maxlen=2)
        self.noise_floor = 0.008

    def process(self, block: np.ndarray, now: float) -> bool:
        mono = block[:, 0] if block.ndim > 1 else block
        rms = float(np.sqrt(np.mean(np.square(mono), dtype=np.float64)))
        peak = float(np.max(np.abs(mono)))

        # Update the ambient floor only when the current block is not transient-heavy.
        if rms < max(self.min_rms, self.noise_floor * 2.5):
            self.noise_floor = self.noise_floor * 0.97 + rms * 0.03

        threshold = max(self.min_rms, self.noise_floor * self.energy_multiplier)
        is_transient = rms >= threshold and peak >= min(0.98, threshold * 2.1)

        if not is_transient or now - self.last_peak < self.refractory:
            return False

        self.last_peak = now
        self.peaks.append(now)
        if len(self.peaks) < 2:
            return False

        gap = self.peaks[-1] - self.peaks[-2]
        if self.min_interval <= gap <= self.max_interval:
            self.peaks.clear()
            return True

        return False


def open_jarvis(url: str) -> None:
    try:
        if sys.platform.startswith("win"):
            import winsound

            winsound.Beep(880, 90)
            winsound.Beep(1175, 110)
    except Exception:
        pass
    webbrowser.open(url, new=2)


def run(url: str, device: int | None) -> None:
    audio_q: queue.Queue[np.ndarray] = queue.Queue(maxsize=12)
    detector = ClapDetector()

    def callback(indata, frames, time_info, status):
        if status:
            print(f"[audio] {status}", file=sys.stderr)
        try:
            audio_q.put_nowait(indata.copy())
        except queue.Full:
            pass

    print("JARVIS Companion activo")
    print("Activación: doble aplauso")
    print(f"Destino: {url}")
    print("Privacidad: el audio se analiza localmente y no se guarda.")
    print("Ctrl+C para salir.\n")

    try:
        with sd.InputStream(
            samplerate=SAMPLE_RATE,
            blocksize=BLOCK_SIZE,
            channels=1,
            dtype="float32",
            device=device,
            callback=callback,
        ):
            while True:
                block = audio_q.get()
                now = time.monotonic()
                if detector.process(block, now):
                    print("👏 👏  JARVIS activado")
                    open_jarvis(url)
                    # Avoid immediately re-triggering from the same physical event.
                    time.sleep(1.2)
    except KeyboardInterrupt:
        print("\nJARVIS Companion detenido.")


def main() -> None:
    parser = argparse.ArgumentParser(description="JARVIS JP local double-clap companion")
    parser.add_argument("--url", default=DEFAULT_URL, help="Command Center URL")
    parser.add_argument("--device", type=int, default=None, help="Optional sounddevice input device index")
    parser.add_argument("--list-devices", action="store_true", help="List audio devices and exit")
    args = parser.parse_args()

    if args.list_devices:
        print(sd.query_devices())
        return

    run(args.url, args.device)


if __name__ == "__main__":
    main()
