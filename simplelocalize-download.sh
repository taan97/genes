#!/usr/bin/env sh
(
simplelocalize download \
  --apiKey E722760D995b21061F5367bEc498C7F7E76b04A776df0b8C \
  --downloadFormat single-language-json \
  --downloadOptions WRITE_NESTED \
  --downloadPath ./src/locales/languages/{lang}.json
) ||
(
while true;
do
    read -e -p "Download locale messages from SimpleLocalize failed. Continue ? [Y/n] " ANS

    if [[ $ANS == "y" || $ANS == "Y" || $ANS == "" ]];
      then exit 0;
      fi
    if [[ $ANS == "n" || $ANS == "N" ]];
      then exit 1;
      fi
done
)
