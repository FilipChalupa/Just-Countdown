#!/bin/bash

original="favicon.svg"
sizes=(36 48 72 96 128 144 192 256 384 512 1024 2048)

for i in "${sizes[@]}"; do
	echo Resizing $i
	name=$i"x"$i".png"
	inkscape.exe -z $original --export-width $i -e $name
done

echo Done
