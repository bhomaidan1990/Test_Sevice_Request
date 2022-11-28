import { Ros, Param, Message, Topic, Service, ServiceRequest } from "roslib";

export default class ROSInterface {
  /************************************************************************
   * ROSInterface class to interface JavaScript with ROS.
   * @author: Belal HMEDAN
   * LIG/Marvin
   * France 2022
   * @param {*} container_id, HTML container name.
   ************************************************************************/
  constructor(container_id) {
    this.container = document.getElementById(container_id, true);
    // console.log(this.container);
    this.ros = new Ros({
      url: "ws://localhost:9090",
    });
  }
  /*************************************************************
   * init Function, to show the status of the connection.
   ************************************************************/
  init() {
    if (this.container in document) {
      // console.log(this.container);
      this.ros.on("connection", function () {
        this.container.innerHTML = "Connected";
      });

      this.ros.on("error", function (error) {
        this.container.innerHTML = "Error";
      });

      this.ros.on("close", function () {
        this.container.innerHTML = "Closed";
      });
    } else {
      // console.log(document);
      this.ros.on("connection", function () {
        console.log("Connected");
      });

      this.ros.on("error", function (error) {
        console.log("Error");
      });

      this.ros.on("close", function () {
        console.log("Closed");
      });
    }
  }

  /********************************************************************************************
   * createMessage Function, to create ROS Message from a given data.
   * @param {*} msg_data, the data to be encapsultaed in the message. Example:
   * Twist {linear : { x : 0.1, y : 0.2, z : 0.3 }, angular : { x : -0.1, y :
   * -0.2, z : -0.3 }}
   * @returns ROS Message
   ********************************************************************************************/
  createMessage=(msg_data) =>{
    const msg = new Message(msg_data);
    return msg;
  }

  /*******************************************************************************************
   * createTopic Function, to create ROS Topic on a given topic name.
   * @param {*} topic_name , String, the name of the topic, e.g. '/cmd_vel'
   * @param {*} msg_type , String, the type of the message, e.g.
   * 'geometry_msgs/Twist'
   * @returns ROS Topic
   *******************************************************************************************/
  createTopic=(topic_name, msg_type) =>{
    const topic_ = new Topic({
      ros: this.ros,
      name: topic_name,
      messageType: msg_type,
    });
    return topic_;
  }

  /*******************************************************************
   * createService Function, to create a ROS Service Client.
   * @param {*} service_name , String, the name of the service, e.g.
   * '/add_two_ints'
   * @param {*} service_type , String, the type of the service,
   * e.g.'rospy_tutorials/AddTwoInts'
   * @returns ROS Service Client
   ******************************************************************/
  createService=(service_name, service_type) =>{
    let service = new Service({
      ros: this.ros,
      name: service_name,
      serviceType: service_type,
    });
    console.log("Service Created Successfully!");
    return service;
  }

    /***************************************************************************
   * reqServ Function, to create a ROS Service Request.
   * @param {*} params, the parameters to pass to the service, Example: {a :
   * 1,  b : 2 }
   * @returns ROS Service Request
   ***************************************************************************/
  requestService=(params) =>{
    let request = new ServiceRequest(params);
    console.log("ServiceRequest Created Successfully!");
    return request;
  }
  
    /*******************************************************************
   * callService_ Function, to call a ROS Service.
   * @param {*} service_name , String, the name of the service, e.g.
   * '/add_two_ints'
   * @param {*} service_type , String, the type of the service,
   * e.g.'rospy_tutorials/AddTwoInts'
   * * @param {*} params, the parameters to pass to the service, Example: {a :
   * 1,  b : 2 }
   * @returns Bool, result
   ******************************************************************/
  callService_ = (service_name, service_type, params) => {
    const srv = this.createService(service_name, service_type);
    const req = this.requestService(params);
    srv.callService(
      req,
      (result) => {
      console.log(result);
      return result;
      },
      (error) => { 
        console.log(error);
      }
    );
   }
  /************************************************************************
   * subscriber Function, to subscribe to given topic name.
   * @param {*} topic_name , String, the name of the topic, e.g. '/cmd_vel'
   * @param {*} msg_type , String, the type of the message, e.g.
   * 'geometry_msgs/Twist'
   * @param {*} callback , Function to call as a callback.
   ************************************************************************/
  subscriber=(topic_name, msg_type, callback)=> {
    const topic_ = this.createTopic(topic_name, msg_type);
    topic_.subscribe(function (msg) {
      callback.call(this, msg.data);
    });
  }

  /***************************************************************************
   * unsubscriber Function, to unsubscribe from a given ROS Topic.
   * @param {*} topic_name , String, the name of the topic, e.g. '/cmd_vel'
   * @param {*} msg_type , String, the type of the message, e.g.
   * 'geometry_msgs/Twist'
   **************************************************************************/
  unsubscribe=(topic_name, msg_type) =>{
    const topic_ = this.createTopic(topic_name, msg_type);
    topic_.unsubscribe();
  }

  /*****************************************************************************
   * publisher Function, to publish a message to a given topic name.
   * @param {*} topic_name , String, the name of the topic, e.g. '/cmd_vel'
   * @param {*} msg_type , String, the type of the message, e.g.
   * 'geometry_msgs/Twist'
   * @param {*} msg_data, the data to be encapsultaed in the message. Example:
   * Twist Message: linear : { x : 0.1, y : 0.2, z : 0.3 }, angular : { x :
   * -0.1, y : -0.2, z : -0.3 }
   *****************************************************************************/
  publisher=(topic_name, msg_type, msg_data) =>{
    const topic_ = this.createTopic(topic_name, msg_type);
    const msg_ = this.createMessage(msg_data);
    topic_.publish(msg_);
  }

  /*******************************************
   * getParams Function, to get ROS Paramters
   ******************************************/
  getParams=()=> {
    this.ros.getParams(function (params) {
      return params;
    });
  }

  /**************************************************************************
   * setParam Function, to set a ROS parameter.
   * @param {*} param_name, string, the name of the parameter, e.g.
   * 'max_vel_y'
   * @param {*} param_val, the value to assign to the given parameter, e.g.
   * 0.8
   **************************************************************************/
  setParam=(param_name, param_val) =>{
    const param_ = new Param({
      ros: this.ros,
      name: param_name,
    });
    param_.set(param_val);
  }

  /*************************************************************************
   * getParam Function, to get ROS Parameter.
   * @param {*} param_name, string, the name of the parameter, e.g.
   * 'max_vel_y'
   *************************************************************************/
  getParam=(param_name)=> {
    const param_ = new Param({
      ros: this.ros,
      name: param_name,
    });
    param_.get(function (value) {
      console.log("MAX VAL: " + value);
    });
  }
}