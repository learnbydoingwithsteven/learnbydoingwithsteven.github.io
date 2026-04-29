import shutil
import os

src1 = r"C:\Users\wjbea\.gemini\antigravity\brain\212624d2-e4af-4171-b5e0-da7a87e2ec23\media__1777499653885.jpg"
src2 = r"C:\Users\wjbea\.gemini\antigravity\brain\212624d2-e4af-4171-b5e0-da7a87e2ec23\media__1777499673408.jpg"

dest1 = r"f:\learnbydoingwithsteven\learnbydoingwithsteven.github.io\assets\past-teaching\ai-office-productivity-grid.jpg"
dest2 = r"f:\learnbydoingwithsteven\learnbydoingwithsteven.github.io\assets\past-teaching\logistics-hrbp-grid.jpg"

try:
    shutil.copy(src1, dest1)
    print(f"Successfully copied {src1} to {dest1}")
except Exception as e:
    print(f"Failed to copy {src1}: {e}")

try:
    shutil.copy(src2, dest2)
    print(f"Successfully copied {src2} to {dest2}")
except Exception as e:
    print(f"Failed to copy {src2}: {e}")
