#!/usr/bin/python3

import rospy
from print_service_server.srv import PickPlace, PickPlaceResponse

def ppp(req):
    pick = req.pick
    place = req.place
    speed = req.speed
    arm = req.arm
    print(pick, place, speed, arm)
    return PickPlaceResponse(True)

def pick_place_rapid_server():
    rospy.init_node('pick_place_server')
    s = rospy.Service('pick_place', PickPlace, ppp)
    rospy.spin()

if __name__ == "__main__":
    pick_place_rapid_server()
