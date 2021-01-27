FROM ubuntu:18.04


# Install python and node runtimes
RUN apt-get update && apt install -y software-properties-common
RUN apt-get update && apt install -y python3.8 && apt install -y python3-pip
RUN apt-get update && apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

# Copy project
RUN mkdir /app
WORKDIR /app
ADD . /app/


# Install any needed packages
RUN pip3 install -r ./backend/requirements.txt
RUN cd frontend && npm install


# Container listens on the HTTPS port
EXPOSE 3000
EXPOSE 5000

# Supervisor installation
RUN apt-get update && apt-get -y install supervisor

ADD supervisor.conf /etc/supervisor.conf

RUN sed -i 's/\r$//' /etc/supervisor.conf

CMD ["supervisord", "-c", "/etc/supervisor.conf"]
