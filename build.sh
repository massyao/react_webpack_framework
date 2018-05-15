#!/bin/sh

WORK_HOME=/home/jk_work/NB200_UI
MODU_NAME=module
BULD_NAME=build
VERS_FILE=version.html
SCPT_NAME=build.sh
DIST_HOME=$(pwd)

rm ${WORK_HOME}/nb200e -rf

# update build script
cp ${WORK_HOME}/nb200e/${SCPT_NAME} ${WORK_HOME}/ -f

# mv source files to workspaces
mv ${DIST_HOME}/${MODU_NAME} ${WORK_HOME}/nb200e

# run build
cd ${WORK_HOME}/nb200e
yarn
npm run build

cp ./${BULD_NAME}/* ${DIST_HOME}/ -rf

# generate version file to dist
echo '<pre>' >> ${VERS_FILE}
svn info | sed -n '/Revision/, $p' >> ${VERS_FILE}
echo '</pre>' >> ${VERS_FILE}
mv ${VERS_FILE} ${DIST_HOME}/ -f

# delete source files
cd ${DIST_HOME}
rm -rf ${WORK_HOME}/nb200e
