/* eslint-disable react/no-unescaped-entities */
import { FaChartBar, FaClipboardList, FaShoppingBag, FaUserPlus } from 'react-icons/fa';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// Sample data for the charts
const patientVisitsData = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 200 },
    { name: 'Wed', visits: 150 },
    { name: 'Thu', visits: 250 },
    { name: 'Fri', visits: 300 },
    { name: 'Sat', visits: 100 },
    { name: 'Sun', visits: 50 },
];

const doctorAvailabilityData = [
    { name: 'Dr. Smith', available: 10, onDuty: 6 },
    { name: 'Dr. Jones', available: 8, onDuty: 5 },
    { name: 'Dr. Lee', available: 9, onDuty: 7 },
    { name: 'Dr. Kumar', available: 5, onDuty: 4 },
];

const bedOccupancyData = [
    { name: 'Occupied', value: 400 },
    { name: 'Available', value: 200 },
];

const appointmentTrendsData = [
    { name: 'Jan', appointments: 300 },
    { name: 'Feb', appointments: 400 },
    { name: 'Mar', appointments: 350 },
    { name: 'Apr', appointments: 500 },
    { name: 'May', appointments: 600 },
];

// Colors for the pie chart
const COLORS = ['#3497F9', '#82ca9d']; // Changed the second color to a light color '#AEDFF7'
 // Changed the second color to '#FF5733'

const DashboardPage = () => {
    const stats = [
        { icon: <FaChartBar className="text-white" />, amount: "$1k", label: "Total Income", change: "+8% from yesterday", bgColor: "bg-red-100", iconBg: "bg-red-500" },
        { icon: <FaClipboardList className="text-white" />, amount: "300", label: "Total Tests", change: "+5% from yesterday", bgColor: "bg-yellow-100", iconBg: "bg-yellow-500" },
        { icon: <FaShoppingBag className="text-white" />, amount: "5", label: "Apoinments Booked", change: "+1.2% from yesterday", bgColor: "bg-green-100", iconBg: "bg-green-500" },
        { icon: <FaUserPlus className="text-white" />, amount: "8", label: "New Patients", change: "0.5% from yesterday", bgColor: "bg-purple-100", iconBg: "bg-purple-500" },
    ];

    return (
       <div className=''>
         <div className="mt-5 ">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-medium text-gray-800">Today's Summary</h2>
                    <p className="text-gray-500">Sales & patient Summary</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-white text-gray-800 font-medium border border-gray-300 rounded-lg shadow hover:bg-gray-100">
                    <span className="mr-2">See Income</span> 📤
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} p-4 rounded-lg shadow-lg`}>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.iconBg} mb-4`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl font-medium text-gray-800">{stat.amount}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                        <p className="text-blue-500 text-sm">{stat.change}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            
          
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Weekly Patient Visits</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={patientVisitsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
           
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Doctor Availability</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={doctorAvailabilityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="available" fill="#82ca9d" />
                        <Bar dataKey="onDuty" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

           
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Bed Occupancy Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={bedOccupancyData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {bedOccupancyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

          
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Monthly Appointment Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={appointmentTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="appointments" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>


       </div>
    );
};

export default DashboardPage;
