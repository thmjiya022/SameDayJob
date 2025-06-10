import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-slate-900 text-white">
			
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold text-blue-400">SameDayJob</h2>
							<p className="text-slate-300 mt-2 text-sm leading-relaxed">
								Connect with skilled professionals for any task, any time. Your trusted marketplace for getting things done.
							</p>
						</div>
						<div className="space-y-2 text-sm text-slate-300">
							<div className="flex items-center space-x-2">
								<Mail className="w-4 h-4 text-blue-400" />
								<span>support@samedayjob.com</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="w-4 h-4 text-blue-400" />
								<span>1-800-SAME-DAY</span>
							</div>
							<div className="flex items-center space-x-2">
								<MapPin className="w-4 h-4 text-blue-400" />
								<span>Available Nationwide</span>
							</div>
						</div>
					</div>
					
					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">For Customers</h3>
						<ul className="space-y-3 text-sm text-slate-300">
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Post a Task</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Browse Services</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">How It Works</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Pricing</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Customer Stories</a></li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">For Taskers</h3>
						<ul className="space-y-3 text-sm text-slate-300">
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Become a Tasker</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Tasker App</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Success Stories</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Tasker Resources</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Insurance & Safety</a></li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">Support & Company</h3>
						<ul className="space-y-3 text-sm text-slate-300">
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Help Center</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact Us</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</a></li>
							<li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Press</a></li>
						</ul>
					</div>
				</div>

				<div className="border-t border-slate-700 mt-8 pt-8">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
						<div className="flex items-center space-x-6 text-sm text-slate-400">
							<span className="flex items-center space-x-1">
								<span className="w-2 h-2 bg-green-400 rounded-full"></span>
								<span>Verified Professionals</span>
							</span>
							<span className="flex items-center space-x-1">
								<span className="w-2 h-2 bg-blue-400 rounded-full"></span>
								<span>Secure Payments</span>
							</span>
							<span className="flex items-center space-x-1">
								<span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
								<span>24/7 Support</span>
							</span>
						</div>
						
						<div className="flex items-center space-x-4">
							<a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors duration-200">
								<Facebook className="w-4 h-4" />
							</a>
							<a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-400 transition-colors duration-200">
								<Twitter className="w-4 h-4" />
							</a>
							<a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 transition-colors duration-200">
								<Instagram className="w-4 h-4" />
							</a>
							<a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 transition-colors duration-200">
								<Linkedin className="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-slate-950 border-t border-slate-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-sm text-slate-400">
						<p>© 2025 SameDayJob. All rights reserved.</p>
						<div className="flex items-center space-x-6">
							<a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
							<a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
							<a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;