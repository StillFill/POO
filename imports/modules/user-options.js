import { Meteor } from 'meteor/meteor';

const sendTo = route => {
	window.location.pathname = route;
};

const userOptions = [
	{
		label: 'Meus cursos',
		icon: 'fa fa-book',
		action: () => sendTo('/meus-cursos')
	},
	{
		label: 'Sair',
		icon: 'fa fa-sign-out-alt',
		action: () => {
			Meteor.logout(() => {
				window.location.pathname = '/home';
			});
		}
	}
];

export const adminOptions = [
	{
		label: 'Cursos',
		icon: 'fa fa-cog',
		action: () => sendTo('/registrar-curso')
	},
	{
		label: 'Relatório',
		icon: 'fa fa-chart-bar',
		action: () => sendTo('/relatorio')
	},
	{
		label: 'Sair',
		icon: 'fa fa-sign-out-alt',
		action: () => {
			Meteor.logout(() => {
				window.location.pathname = '/home';
			});
		}
	}
];

export default userOptions;
