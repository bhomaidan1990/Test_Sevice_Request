#!/usr/bin/python3

from distutils.core import setup
from catkin_pkg.python_setup import generate_distutils_setup

# fetch values from package.xml
setup_args = generate_distutils_setup(
    packages=['print_service_server'],
    scripts=['src/print_service_server/print_server.py'],
    package_dir={'': 'src'},
    requires=['rospy']
)

setup(**setup_args)