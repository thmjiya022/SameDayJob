import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	BarChart3,
	Plus,
	FileText,
	MessageCircle,
	CreditCard,
	User,
	Menu,
	Users,
	Settings,
	LogOut,
} from 'lucide-react';

interface User {
	userID: number;
	name: string;
	email: string;
	phoneNumber: string;
	rating?: number;
	completedJobs?: number;
	avatar?: string;
}

interface SidebarProps {
	user: User;
	onLogout?: () => void;
}

interface MenuItem {
	id: string;
	name: string;
	icon: React.ReactNode;
	route: string;
	badge?: number;
}

const Sidebar = ({ user, onLogout }: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const menuItems: MenuItem[] = [
		{ id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, route: '/dashboard' },
		{ id: 'post-job', name: 'Post Job', icon: <Plus className="w-5 h-5" />, route: '/post-job' },
		{ id: 'my-jobs', name: 'My Jobs', icon: <FileText className="w-5 h-5" />, route: '/my-jobs' },
		{ id: 'messages', name: 'Messages', icon: <MessageCircle className="w-5 h-5" />, route: '/messages', badge: 3 },
		{ id: 'payments', name: 'Payments', icon: <CreditCard className="w-5 h-5" />, route: '/payments' },
		{ id: 'workers', name: 'Find Workers', icon: <Users className="w-5 h-5" />, route: '/workers' },
		{ id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" />, route: '/profile' }
	];

	const handleMenuClick = (route: string) => {
		navigate(route);
		setMobileSidebarOpen(false);
	};

	const handleLogout = () => {
		if (onLogout) onLogout();
		setMobileSidebarOpen(false);
	};

	const isActiveRoute = (route: string) => location.pathname === route;

	const SidebarContent = () => (
		<div className="flex flex-col h-full bg-white w-64 border-r border-gray-200">

			<nav className="flex-1 py-4 space-y-1 overflow-y-auto px-2">
				{menuItems.map(item => (
					<button
						key={item.id}
						className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
							isActiveRoute(item.route)
								? 'bg-blue-50 text-blue-600 shadow-sm'
								: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
						}`}
						onClick={() => handleMenuClick(item.route)}
					>
						<div className="flex items-center space-x-3">
							<span className="text-gray-400 group-hover:text-gray-600">{item.icon}</span>
							<span>{item.name}</span>
						</div>
						{item.badge && (
							<span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
								{item.badge}
							</span>
						)}
					</button>
				))}
			</nav>

			<div className="p-4 border-t border-gray-200 space-y-1">
				<button
					className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
					onClick={() => handleMenuClick('/settings')}
				>
					<Settings className="w-5 h-5 text-gray-400" />
					<span>Settings</span>
				</button>

				<button
					className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
					onClick={handleLogout}
				>
					<LogOut className="w-5 h-5" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-lg rounded-lg text-gray-600 hover:text-gray-900"
				onClick={() => setMobileSidebarOpen(true)}
			>
				<Menu className="w-6 h-6" />
			</button>

			{/* Mobile Backdrop */}
			{mobileSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={() => setMobileSidebarOpen(false)}
				/>
			)}

			{/* Mobile Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
					mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<SidebarContent />
			</aside>

			{/* Desktop Sidebar */}
			<aside className="hidden md:flex flex-col sticky top-0 h-screen w-64">
				<SidebarContent />
			</aside>
		</>
	);
};

export default Sidebar;
