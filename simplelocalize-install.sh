#!/usr/bin/env sh
echo "\n-----------------------------------"
echo "SimpleLocalize CLI setup"
echo "You will be asked for your SimpleLocalize password during installation process"

while true;
do
    read -e -p "Use SimpleLocalize CLI to synchronize your translation files with local files ? [Y/n] " ANS

    if [[ $ANS == "y" || $ANS == "Y" ]];
      then curl -s https://get.simplelocalize.io/2.1/install | bash;
      exit 0;
      fi
    if [[ $ANS == "n" || $ANS == "N" ]];
      then exit 0;
      fi
done
