FROM node:0.10-onbuild
# replace this with your application's default port
ENV PORT 8888
#RUN apt-get update && apt-get install -y vim
EXPOSE 8888
