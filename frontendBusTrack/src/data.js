export const menu = [
  {
    id: 1,
    title: "MAIN",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "/media/dashboard.svg",
      },
    ],
  },
  {
    id: 2,
    title: "USER MANAGEMENT",
    listItems: [
      {
        id: 1,
        title: "Students",
        url: "/students",
        icon: "/media/student.svg",
      },
      {
        id: 2,
        title: "Staffs",
        url: "/staffs",
        icon: "/media/admin.svg",
      },
      {
        id: 3,
        title: "Drivers",
        url: "/drivers",
        icon: "/media/driver.svg",
      },
    ],
  },
  {
    id: 3,
    title: "ROUTE MANAGEMENT",
    listItems: [
      {
        id: 1,
        title: "Bus Routes",
        url: "/routes",
        icon: "/media/bus-route.svg",
      },
    ],
  },
  {
    id: 4,
    title: "BUS MANAGEMENT",
    listItems: [
      {
        id: 1,
        title: "Buses",
        url: "/buses",
        icon: "/media/bus.svg",
      },
    ],
  },
  {
    id: 5,
    title: "SCHEDULE MANAGEMENT",
    listItems: [
      {
        id: 1,
        title: "Schedules",
        url: "/schedules",
        icon: "/media/schedule.svg",
      },
    ],
  },
  {
    id: 6,
    title: "ANNOUNCEMENT MANAGEMENT",
    listItems: [
      {
        id: 1,
        title: "Announcements",
        url: "/announcements",
        icon: "/media/announcement.svg",
      },
    ],
  },
  {
    id: 7,
    title: "SETTINGS",
    listItems: [
      {
        id: 1,
        title: "Logout",
        url: "/logout",
        icon: "/media/logout.svg",
      },
    ],
  },
];

export const columnTitle = [
  {
    id: 1,
    slug: "students",
    listItems: [
      {
        field: "student_name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.student_name}</div>;
        },
      },
      {
        field: "student_email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "student_phone",
        headerName: "Phone",
        flex: 0.8,
      },
      {
        field: "student_dob",
        headerName: "DOB (DD/MM/YYYY)",
        flex: 0.7,
      },
      {
        field: "student_address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "student_account_status",
        headerName: "Account Status",
        flex: 0.8,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithStatus ${params.row.student_account_status}`}
            >
              <span>{params.row.student_account_status}</span>
            </div>
          );
        },
      },
    ],
  },
  {
    id: 2,
    slug: "staffs",
    listItems: [
      {
        field: "staff_name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.staff_name}</div>;
        },
      },
      {
        field: "staff_email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "staff_isAdmin",
        headerName: "Is Admin?",
        flex: 0.8,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.staff_isAdmin}`}>
              <span>{params.row.staff_isAdmin}</span>
            </div>
          );
        },
      },
    ],
  },
  {
    id: 3,
    slug: "drivers",
    listItems: [
      {
        field: "driver_name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.driver_name}</div>;
        },
      },
      {
        field: "driver_email",
        headerName: "Email",
        flex: 1,
      },
    ],
  },
  {
    id: 4,
    slug: "buses",
    listItems: [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "bus_name",
        headerName: "Plate Number",
        flex: 1,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.bus_name}</div>;
        },
      },
      {
        field: "bus_capacity",
        headerName: "Capacity",
        flex: 1,
      },
      {
        field: "bus_status",
        headerName: "Status",
        flex: 0.8,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.bus_status}`}>
              <span>{params.row.bus_status}</span>
            </div>
          );
        },
      },
    ],
  },
  {
    id: 5,
    slug: "announcements",
    listItems: [
      {
        field: "id",
        headerName: "Id",
        flex: 1,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },
      {
        field: "announcement_title",
        headerName: "Title",
        flex: 1,
      },
      {
        field: "announcement_date",
        headerName: "Publish Date (YYYY-MM-DD)",
        flex: 1,
      },
      {
        field: "announcement_time",
        headerName: "Publish Time (HH:MM:SS)",
        flex: 1,
      },
      {
        field: "staff_email",
        headerName: "Publish Sender",
        flex: 1,
      },
    ],
  },
  {
    id: 6,
    slug: "schedules",
    listItems: [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },
      {
        field: "schedule_name",
        headerName: "Schedule Name",
        flex: 1,
      },
      {
        field: "schedule_route",
        headerName: "Route",
        flex: 1,
      },
      {
        field: "schedule_bus",
        headerName: "Bus",
        flex: 1,
      },
      {
        field: "schedule_time",
        headerName: "Schedule Time (HH:MM)",
        flex: 1,
      },
      {
        field: "schedule_status",
        headerName: "Status",
        flex: 0.8,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.schedule_status}`}>
              <span>{params.row.schedule_status}</span>
            </div>
          );
        },
      },
    ],
  },
  {
    id: 7,
    slug: "routes",
    listItems: [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },
      {
        field: "route_name",
        headerName: "Route Name",
        flex: 1,
      },
      {
        field: "route_duration",
        headerName: "Route Travel Duration (min)",
        flex: 1,
      },
      {
        field: "routeTotalDistance",
        headerName: "Route Total Distance (km)",
        flex: 1,
      },
    ],
  },
];

export const formFields = [
  {
    id: 1,
    slug: "students",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "student_name",
        placeholder: "Enter full name",
      },
      {
        label: "Email",
        type: "email",
        name: "student_email",
        placeholder: "Enter email",
      },
      {
        label: "Password",
        type: "password",
        name: "student_password",
        placeholder: "Enter password",
      },
      {
        label: "Phone Number",
        type: "tel",
        name: "student_phone",
        placeholder: "Enter phone number",
      },
      {
        label: "Date of Birth",
        type: "date",
        name: "student_dob",
        placeholder: "Select date of birth",
      },
      {
        label: "Address",
        type: "text",
        name: "student_address",
        placeholder: "Enter address",
      },
      {
        label: "Account Status",
        type: "select",
        name: "student_account_status",
        options: ["Pending", "Active", "Inactive"],
        placeholder: "Select account status",
      },
    ],
  },
  {
    id: 2,
    slug: "staffs",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "staff_name",
        placeholder: "Enter full name",
      },
      {
        label: "Email",
        type: "email",
        name: "staff_email",
        placeholder: "Enter email",
      },
      {
        label: "Password",
        type: "password",
        name: "staff_password",
        placeholder: "Enter password",
      },
      {
        label: "Is Admin?",
        type: "select",
        name: "staff_isAdmin",
        options: ["Yes", "No"],
        placeholder: "Select is admin",
      },
    ],
  },
  {
    id: 3,
    slug: "drivers",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "driver_name",
        placeholder: "Enter full name",
      },
      {
        label: "Email",
        type: "email",
        name: "driver_email",
        placeholder: "Enter email",
      },
      {
        label: "Password",
        type: "password",
        name: "driver_password",
        placeholder: "Enter password",
      },
    ],
  },
  {
    id: 4,
    slug: "buses",
    listItems: [
      {
        label: "Plate Number",
        type: "text",
        name: "bus_name",
        placeholder: "Enter Plate Number",
      },
      {
        label: "Bus Capacity",
        type: "text",
        name: "bus_capacity",
        placeholder: "Enter bus capacity",
      },
      {
        label: "Status",
        type: "select",
        name: "bus_status",
        options: ["Active", "Inactive"],
        placeholder: "Select bus status",
      },
    ],
  },
  {
    id: 5,
    slug: "announcements",
    listItems: [
      {
        label: "Title",
        type: "text",
        name: "announcement_title",
        placeholder: "Enter Title",
      },
      {
        label: "Description",
        type: "text",
        name: "announcement_description",
        placeholder: "Enter Description",
      },
    ],
  },
  {
    id: 6,
    slug: "schedules",
    listItems: [
      {
        label: "Schedule Name",
        type: "text",
        name: "schedule_name",
        placeholder: "Enter Schedule Name",
      },
      {
        label: "Driver",
        type: "select",
        name: "schedule_driver",
        placeholder: "Select Driver",
      },
      {
        label: "Bus",
        type: "select",
        name: "schedule_bus",
        placeholder: "Select Bus",
      },
      {
        label: "Route",
        type: "select",
        name: "schedule_route",
        placeholder: "Select Route",
      },
      {
        label: "Start Time",
        type: "time",
        name: "schedule_time",
        placeholder: "Select Time",
      },
      {
        label: "Status",
        type: "select",
        name: "schedule_status",
        options: ["Active", "Inactive"],
        placeholder: "Select status",
      },
      {
        label: "Repeat Schedule?",
        type: "select",
        name: "scheduleRepeat",
        options: ["Yes", "No"],
        placeholder: "Select Yes or No",
      },
    ],
  },
  {
    id: 7,
    slug: "routes",
    listItems: [
      {
        label: "Route Name",
        type: "text",
        name: "route_name",
        placeholder: "Enter Route Name",
      },
      {
        label: "Route Travel Duration (min)",
        type: "number",
        name: "route_duration",
        placeholder: "Enter Route Travel Duration (min)",
      },
    ],
  },
];

export const formFieldsEdit = [
  {
    id: 1,
    slug: "students",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "student_name",
        placeholder: "Enter full name",
      },
      {
        label: "Phone Number",
        type: "tel",
        name: "student_phone",
        placeholder: "Enter phone number",
      },
      {
        label: "Date of Birth",
        type: "date",
        name: "student_dob",
        placeholder: "Select date of birth",
      },
      {
        label: "Address",
        type: "text",
        name: "student_address",
        placeholder: "Enter address",
      },
      {
        label: "Account Status",
        type: "select",
        name: "student_account_status",
        options: ["Pending", "Active", "Inactive"],
        placeholder: "Select account status",
      },
    ],
  },
  {
    id: 2,
    slug: "staffs",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "staff_name",
        placeholder: "Enter full name",
      },
      {
        label: "Email",
        type: "email",
        name: "staff_email",
        placeholder: "Enter email",
      },
      {
        label: "Is Admin?",
        type: "select",
        name: "staff_isAdmin",
        options: ["Yes", "No"],
        placeholder: "Select is admin",
      },
    ],
  },
  {
    id: 3,
    slug: "drivers",
    listItems: [
      {
        label: "Name",
        type: "text",
        name: "driver_name",
        placeholder: "Enter full name",
      },
      {
        label: "Email",
        type: "email",
        name: "driver_email",
        placeholder: "Enter email",
      },
    ],
  },
  {
    id: 4,
    slug: "buses",
    listItems: [
      {
        label: "Plate Number",
        type: "text",
        name: "bus_name",
        placeholder: "Enter Plate Number",
      },
      {
        label: "Bus Capacity",
        type: "text",
        name: "bus_capacity",
        placeholder: "Enter bus capacity",
      },
      {
        label: "Status",
        type: "select",
        name: "bus_status",
        options: ["Active", "Inactive"],
        placeholder: "Select bus status",
      },
    ],
  },
  {
    id: 5,
    slug: "announcements",
    listItems: [
      {
        label: "Title",
        type: "text",
        name: "announcement_title",
        placeholder: "Enter Title",
      },
      {
        label: "Description",
        type: "text",
        name: "announcement_description",
        placeholder: "Enter Description",
      },
    ],
  },
  {
    id: 6,
    slug: "schedules",
    listItems: [
      {
        label: "Schedule Name",
        type: "text",
        name: "schedule_name",
        placeholder: "Enter Schedule Name",
      },
      {
        label: "Driver",
        type: "select",
        name: "schedule_driver",
        placeholder: "Select Driver",
      },
      {
        label: "Bus",
        type: "select",
        name: "schedule_bus",
        placeholder: "Select Bus",
      },
      {
        label: "Route",
        type: "select",
        name: "schedule_route",
        placeholder: "Select Route",
      },
      {
        label: "Start Time",
        type: "time",
        name: "schedule_time",
        placeholder: "Select Time",
      },
      {
        label: "Status",
        type: "select",
        name: "schedule_status",
        options: ["Active", "Inactive"],
        placeholder: "Select status",
      },
      {
        label: "Repeat Schedule?",
        type: "select",
        name: "scheduleRepeat",
        options: ["Yes", "No"],
        placeholder: "Select Yes or No",
      },
    ],
  },
  {
    id: 7,
    slug: "routes",
    listItems: [
      {
        label: "Route Name",
        type: "text",
        name: "route_name",
        placeholder: "Enter Route Name",
      },
      {
        label: "Route Travel Duration (min)",
        type: "number",
        name: "route_duration",
        placeholder: "Enter Route Travel Duration",
      },
    ],
  },
];
