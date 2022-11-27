import { Ros, Service, ServiceRequest } from "roslib";

class PlanScheduler {
  constructor() {}

  execute_action = () => {

    const srv = new Service({
      ros: new Ros({url: "ws://localhost:9090",}),
      name: "/pick_place",
      serviceType: "print_service_server/PickPlace",
    });

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
