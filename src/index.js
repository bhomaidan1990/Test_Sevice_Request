import { Ros, Service, ServiceRequest } from "roslib";

class ROSInterface {
  constructor() {
    this.ros = new Ros({
      url: "ws://localhost:9090",
    });
  }

  createService = (service_name, service_type) => {
    const service = new Service({
      ros: this.ros,
      name: service_name,
      serviceType: service_type,
    });
      console.log("Service Created!");
    return service;
  };

}

class PlanScheduler {
  constructor() {
    this.iface = new ROSInterface();
    this.old_status = false;
  }

  execute_action = () => {
    const service_name = "/pick_place";
    const service_type = "print_service_server/PickPlace";

    const srv = this.iface.createService(service_name, service_type);

    const params_ = {
      pick: {
        x: 0.1,
        y: 0.2,
        z: 0.3,
      },
      place: {
        x: -0.1,
        y: -0.2,
        z: -0.3,
      },
      speed: 200,
      arm: false,
    };

    const request = new ServiceRequest(params_);

    srv.callService(request, function (result) {
      console.log("Service Called!");
      console.log(result);
    });
  }
}

var PS_ = new PlanScheduler();
PS_.execute_action();
