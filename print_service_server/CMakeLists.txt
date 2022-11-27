
cmake_minimum_required(VERSION 3.9.1)

########################################################################################################################
# Metadata
########################################################################################################################
# Read the package manifest.
file(READ "${CMAKE_CURRENT_SOURCE_DIR}/package.xml" package_xml_str)

# Extract project name.
if(NOT package_xml_str MATCHES "<name>([A-Za-z0-9_]+)</name>")
  message(FATAL_ERROR "Could not parse project name from package manifest (aborting)")
else()
  set(extracted_name ${CMAKE_MATCH_1})
endif()

# Extract project version.
if(NOT package_xml_str MATCHES "<version>([0-9]+.[0-9]+.[0-9]+)</version>")
  message(FATAL_ERROR "Could not parse project version from package manifest (aborting)")
else()
  set(extracted_version ${CMAKE_MATCH_1})
endif()

########################################################################################################################
# CMake project
########################################################################################################################
project(${extracted_name} VERSION ${extracted_version} LANGUAGES CXX)

#===========================================================
# Dependencies
#===========================================================

#-----------------------------
# Catkin packages
#-----------------------------
find_package(catkin REQUIRED COMPONENTS
rospy 
std_msgs 
geometry_msgs 
message_generation
)

catkin_python_setup()

# Generate services in the 'srv' folder
add_service_files(
  FILES
  PickPlace.srv
)

## Generate added messages and services with any dependencies listed here
generate_messages(
  DEPENDENCIES
  std_msgs 
  geometry_msgs
)

#===========================================================
# Catkin package specific configurations
#===========================================================
catkin_package(
  CATKIN_DEPENDS
  rospy
  std_msgs 
geometry_msgs
  message_runtime
  # LIBRARIES ${PROJECT_NAME}
)

#===========================================================
# Catkin package specific scripts
#===========================================================
catkin_install_python(PROGRAMS
  src/${PROJECT_NAME}/print_server.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)