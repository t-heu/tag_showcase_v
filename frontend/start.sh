#!/bin/bash
echo "Select an option to run:"
echo "1 - Executar dev?"
echo "2 - Gerar build?"
read v1
case $v1 in
  "1")
    yarn start
    cd electron && yarn dev
    echo "command $v1 successfully executed!"
    ;;
  "2")
    DIR="/electron/build/"
    if [ -d "$DIR" ]; then
      rm -r electron/build
    fi
    yarn build
    cp -r build electron
    rm -r build
    cd electron && yarn build && yarn start
    echo 'build successfully generated, command executed: "$v1"'
    ;;
  $v1)
    echo "Error! Not found command"
    ;;
esac