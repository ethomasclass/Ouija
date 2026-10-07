# YouTube master (1080p, −14 LUFS)

Split into three parts to stay under GitHub's 100 MB file limit. Join them back into one file (no re-encode) before uploading:

```sh
cd review/master
printf "file '%s'\n" Good_Luck_Ouija_1080p_part0.mp4 Good_Luck_Ouija_1080p_part1.mp4 Good_Luck_Ouija_1080p_part2.mp4 > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy Good_Luck_Ouija_1080p.mp4
```

Or rebuild it from source with `video/tools/render.sh` (about 1.5 hours on 4 cores).
