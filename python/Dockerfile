FROM osgeo/gdal:ubuntu-small-3.6.3

# Install python3 
RUN apt update && apt-get install -y python3 
RUN apt update && apt-get install python3-pip -y
RUN apt update && apt-get install -y gdal-bin python3-gdal
RUN pip3 install flask
RUN pip3 install pandas
# RUN pip3 install psycopg2
RUN pip3 install jsons
RUN pip3 install requests
RUN pip3 install scipy
RUN pip3 install opencv-python
# RUN pip3 install torch
# RUN pip3 install ultralytics
# RUN pip3 install base64
RUN pip3 install matplotlib
RUN pip3 install pillow
# RUN pip3 install segment-geospatial

WORKDIR /mnt

ENTRYPOINT ["python3"]
CMD ["app.py"]