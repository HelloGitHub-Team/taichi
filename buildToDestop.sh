yarn build
cd ~/Desktop
rm -rf temp-build-directory
mkdir temp-build-directory
cd -
mv dist ~/Desktop/temp-build-directory
cd ~/Desktop/temp-build-directory
zip -r "dist-$(date +"%Y-%m-%d %H-%M-%S").zip" dist
cd -

