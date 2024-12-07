import React from "react";
import "./Agent_Card.css";

function Agent_Card({ agent }) {
	return (
		<div className="Agent_card_parent">
			<div className="agent_img">
				<img src={agent.images} alt={agent.name} />
			</div>
			<div className="Agent_card_detail">
				<div className="count">
					<p>LISTING</p>
					<p>{agent.property_list} Properties</p>
				</div>
				<h1>{agent.username}</h1>
				<div className="social">
					<a href="#">
						<i class="fa-brands fa-twitter"></i>
					</a>
					<a href="#">
						<i class="fa-brands fa-facebook"></i>
					</a>
					<a href="#">
						<i class="fa-brands fa-google"></i>
					</a>
					<a href="#">
						<i class="fa-brands fa-instagram"></i>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Agent_Card;
