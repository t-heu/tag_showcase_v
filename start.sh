#!/bin/bash
echo "Selecione uma opção:"
echo "1 - dev"
echo "2 - start"
read v1
if [ $v1 = "1" ];
  then
    yarn start
    cd electron && yarn dev
    echo "command $v1 successfully executed!"
  else
    yarn build
    rm -r electron/build && cp -r build electron ||  cp -r build electron
    cd electron && yarn build && yarn start
    echo "command $v1 successfully executed!"
fi
