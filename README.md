## ROSLib ServiceRequest 

---

1. Install and run [rosbridge server](http://wiki.ros.org/rosbridge_server)

```
roslaunch rosbridge_server rosbridge_websocket.launch 
```
2. build the catkin workspace including `print_service_server`:

```
catkin init
catkin b
. devel/setup.bash
rosrun print_service_server print_server.py
```

3. Install and run necessary libraries using `node.js`:

```
npm i
npm run build
npm run serve
```
Open [Page](http://127.0.0.1:3000)
