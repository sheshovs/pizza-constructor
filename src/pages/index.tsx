import { Grid, Button, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import MasaTradicional from "../assets/img/borde.png";
import MasaDelgada from "../assets/img/sin-borde.png";
import Salsa from "../assets/img/salsa.png";
import Queso from "../assets/img/queso.png";
import Tomates from "../assets/img/tomate.png";
import Champinones from "../assets/img/champi.png";
import Aceitunas from "../assets/img/aceitunas.png";
import Cebolla from "../assets/img/cebolla.png";
import Pepperoni from "../assets/img/pepperoni.png";
import Pimenton from "../assets/img/pimenton.png";

const todosIngredientes = [
	{
		nombre: "Tomate",
		src: Tomates.src,
		zIndex: 40,
	},
	{
		nombre: "Champiñon",
		src: Champinones.src,
		zIndex: 50,
	},
	{
		nombre: "Pepperoni",
		src: Pepperoni.src,
		zIndex: 60,
	},
	{
		nombre: "Cebolla",
		src: Cebolla.src,
		zIndex: 70,
	},
	{
		nombre: "Aceituna",
		src: Aceitunas.src,
		zIndex: 80,
	},
	{
		nombre: "Pimentón",
		src: Pimenton.src,
		zIndex: 90,
	},
];

interface InitialState {
	base: string;
	ingredientes: Array<{ nombre: string; src: string; zIndex: number }>;
	ingredienteEstado: { [key: string]: boolean };
}

export default function Home() {
	const [state, setState] = useState<InitialState>({
		base: MasaTradicional.src,
		ingredientes: [],
		ingredienteEstado: {},
	});

	const { base, ingredientes, ingredienteEstado } = state;

	const nombreIngredientes = ingredientes.map(
		(ingrediente) => ingrediente.nombre
	);

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			p={4}
			sx={{ minHeight: "100vh", backgroundColor: "#ddd" }}
		>
			<Grid
				container
				item
				md={5}
				justifyContent="center"
				alignItems="center"
				mt={4}
				sx={{ position: "relative" }}
			>
				{ingredientes.map((ingrediente, i) => {
					return (
						<Image
							key={i}
							src={ingrediente.src}
							alt={ingrediente.nombre}
							width={230}
							height={230}
							style={{
								position: "absolute",
								zIndex: ingrediente.zIndex,
								transform: `rotate(${Math.random() * 100}deg)`,
							}}
						/>
					);
				})}
				<Image
					src={Queso}
					alt="Queso"
					width={240}
					height={240}
					style={{ position: "absolute", zIndex: 30 }}
				/>
				<Image
					src={Salsa}
					alt="Salsa"
					width={240}
					height={240}
					style={{ position: "absolute", zIndex: 20 }}
				/>
				<Image
					src={base}
					alt="Masa"
					width={250}
					height={250}
					style={{ position: "absolute", zIndex: 10 }}
				/>
			</Grid>
			<Grid
				container
				item
				md={3}
				gap={2}
				p={2}
				mt={20}
				sx={{
					backgroundColor: "#eee",
					borderRadius: "4px",
				}}
			>
				<Grid container gap={1}>
					<Grid container>
						<Typography>Masa</Typography>
					</Grid>
					<Button
						variant={base === MasaTradicional.src ? "outlined" : "contained"}
						onClick={() => setState({ ...state, base: MasaTradicional.src })}
					>
						Tradicional
					</Button>
					<Button
						variant={base === MasaDelgada.src ? "outlined" : "contained"}
						onClick={() => setState({ ...state, base: MasaDelgada.src })}
					>
						Delgada
					</Button>
				</Grid>
				<Grid container gap={1}>
					<Grid container>
						<Typography>Ingredientes</Typography>
					</Grid>
					<Grid container gap={2}>
						{todosIngredientes.map((ingrediente) => {
							return (
								<Button
									key={ingrediente.nombre}
									variant={
										nombreIngredientes.includes(ingrediente.nombre)
											? "outlined"
											: "contained"
									}
									onClick={() => {
										if (ingredienteEstado[ingrediente.nombre]) {
											setState({
												...state,
												ingredientes: ingredientes.filter(
													(ingredientesAplicados) =>
														ingredientesAplicados.nombre !== ingrediente.nombre
												),
												ingredienteEstado: {
													...ingredienteEstado,
													[ingrediente.nombre]: false,
												},
											});
											return;
										}
										setState({
											...state,
											ingredientes: [...ingredientes, ingrediente],
											ingredienteEstado: {
												...ingredienteEstado,
												[ingrediente.nombre]: true,
											},
										});
									}}
								>
									{ingrediente.nombre}
								</Button>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
