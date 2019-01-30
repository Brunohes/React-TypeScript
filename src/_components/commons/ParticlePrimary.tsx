import Particles from 'react-particles-js'
import * as React from 'react'

export default class ParticlePrimary extends React.Component {
	public shouldComponentUpdate() {
		return false
	}
	public render() {
		return (
			<Particles
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: 1
				}}
				params={{
					particles: {
						number: {
							value: 125,
							density: {
								enable: true,
								value_area: 450
							}
						},
						color: {
							value: '#FFF'
						},
						shape: {
							type: 'circle',
							stroke: {
								width: 0,
								color: '#000000'
							},
							polygon: {
								nb_sides: 5
							}
						},
						opacity: {
							value: 0.5,
							random: false,
							anim: {
								enable: true,
								speed: 1,
								opacity_min: 0,
								sync: false
							}
						},
						size: {
							value: 4,
							random: true,
							anim: {
								enable: true,
								speed: 1,
								size_min: 2,
								sync: false
							}
						},
						line_linked: {
							enable: false,
							distance: 150,
							color: '#FFF',
							opacity: 1,
							width: 1
						},
						move: {
							enable: true,
							speed: 2,
							direction: 'none',
							random: false,
							straight: false,
							out_mode: 'out',
							bounce: false,
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200
							}
						}
					},
					interactivity: {
						detect_on: 'canvas',
						events: {
							onhover: {
								enable: true,
								mode: 'bubble'
							},
							onclick: {
								enable: false,
								mode: 'push'
							},
							resize: true
						},
						modes: {
							grab: {
								distance: 140,
								line_linked: {
									opacity: 1
								}
							},
							bubble: {
								distance: 80,
								size: 0,
								duration: 0,
								opacity: 0,
								speed: 1
							},
							repulse: {
								distance: 80,
								duration: 0.4
							},
							push: {
								particles_nb: 4
							},
							remove: {
								particles_nb: 2
							}
						}
					},
					retina_detect: true
				}}
			/>
		)
	}
}
