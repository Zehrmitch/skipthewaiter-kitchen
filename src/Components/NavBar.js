import { TemplateIcon, UserIcon, TableIcon, EyeIcon } from '@heroicons/react/solid';
import AuthenticationButton from './authentication-button';

const tabs = [
	{ name: 'Dashboard', href: '/dashboard', icon: TemplateIcon, id: 0 },
	{ name: 'Profile', href: '/profile', icon: UserIcon, id: 1 },
	{ name: 'Menu Builder', href:'/menubuilder', icon: TableIcon, id: 2},
	{ name: 'Menu Preview', href:'/menupreview', icon: EyeIcon, id: 3},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function setId(id) {
	sessionStorage.setItem('id', id);
}

export default function NavBar() {
	return (
		<div>
			<div className='px-1 py-2 text-center bg-red-300'>
				<h2>Skip The Waiter</h2>
			</div>
			<div className='px-1'>
				<div className='border-b border-gray-200'>
					<nav className='-mb-px flex space-x-4' aria-label='Tabs'>
						{tabs.map((tab) => (
							<a
								onClick={() => setId(tab.id)}
								key={tab.name}
								href={tab.href}
								className={classNames(
									tab.id == sessionStorage.getItem('id')
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
									'group inline-flex items-center py-4 px-1 border-b-2 fontx-medium text-sm'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								<tab.icon
									className={classNames(
										tab.id == sessionStorage.getItem('id')
											? 'text-indigo-500'
											: 'text-gray-400 group-hover:text-gray-500',
										'-ml-0.5 mr-2 h-5 w-5'
									)}
									aria-hidden='true'
								/>
								<span>{tab.name}</span>
							</a>
						))}

						<AuthenticationButton />
						<a
							className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 fontx-medium text-sm'
							onClick={() => window.location.reload()}
						>
							{' '}
							Reload
						</a>
					</nav>
				</div>
			</div>
		</div>
	);
}
