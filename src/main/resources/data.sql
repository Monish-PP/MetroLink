INSERT INTO transit_corridor (corridor_code, corridor_name, description, start_terminal, end_terminal, passenger_rate, operating_start_time, operating_end_time, status) VALUES ('M1', 'Mountain Line 1', 'Main tourist line', 'Base', 'Peak', 15.0, '06:00', '22:00', 'ACTIVE');

INSERT INTO terminal (terminal_code, terminal_name, location, latitude, longitude, corridor_id, passenger_capacity, status) VALUES ('T1', 'Base Terminal', 'Valley', 45.0, 9.0, 1, 500, 'ACTIVE');
INSERT INTO terminal (terminal_code, terminal_name, location, latitude, longitude, corridor_id, passenger_capacity, status) VALUES ('T2', 'Peak Terminal', 'Mountain', 45.1, 9.1, 1, 300, 'ACTIVE');

INSERT INTO cable_car (vehicle_code, vehicle_name, corridor_id, capacity, current_speed, motor_status, operational_status, maintenance_status) VALUES ('C1', 'Car Alpha', 1, 50, 0.0, 'ON', 'ACTIVE', 'OK');
INSERT INTO cable_car (vehicle_code, vehicle_name, corridor_id, capacity, current_speed, motor_status, operational_status, maintenance_status) VALUES ('C2', 'Car Beta', 1, 50, 0.0, 'ON', 'ACTIVE', 'OK');
INSERT INTO cable_car (vehicle_code, vehicle_name, corridor_id, capacity, current_speed, motor_status, operational_status, maintenance_status) VALUES ('C3', 'Car Gamma', 1, 50, 0.0, 'ON', 'ACTIVE', 'OK');
INSERT INTO cable_car (vehicle_code, vehicle_name, corridor_id, capacity, current_speed, motor_status, operational_status, maintenance_status) VALUES ('C4', 'Car Delta', 1, 50, 0.0, 'ON', 'ACTIVE', 'OK');
