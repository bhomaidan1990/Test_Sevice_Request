import ROSInterface from "./js/ROSIface.js"

class PlanScheduler {
  constructor() {
    this.iface_ = new ROSInterface();
  }

  execute_action = () => {
    const service_name = "/pick_place";
    const service_type = "print_service_server/PickPlace"; 
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

    this.iface_.callService_(service_name, service_type, params_)
  }
}

var PS_ = new PlanScheduler();
PS_.execute_action();