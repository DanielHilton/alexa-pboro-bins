#!/usr/bin/env bash

rm alexa-pboro-bins.zip
zip --recurse-paths alexa-pboro-bins.zip . -x *.git* -x *.idea* -x *test*