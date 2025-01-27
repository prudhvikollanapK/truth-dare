import React, { useState, useRef } from 'react';
import { FaUser, FaUserPlus, FaTimes, FaHeart } from 'react-icons/fa';
import './TruthOrDare.css';
import { signature } from '../Assests/images/imagePath';
import { RiErrorWarningFill } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import { ImCross } from "react-icons/im";

function TruthOrDare() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const wheelRef = useRef(null);

  const [error, setError] = useState("");

  const addPlayer = () => {
    if (!newPlayer.trim()) {
      setError("Player name cannot be empty");
      setIsErrorModalOpen(true)
      return;
    }
    if (players.includes(newPlayer)) {
      setError("Player already exists");
      setIsErrorModalOpen(true)
      return;
    }
    setPlayers([...players, newPlayer]);
    setNewPlayer("");
    setError("");
  };
  const removePlayer = (playerName) => {
    setPlayers(players.filter((player) => player !== playerName));
  };

  const spinBottle = () => {
    if (players.length < 2) {
      setIsWarningModalOpen(true);
      return;
    }

    const randomRotation = Math.floor(Math.random() * 3600) + 3600;
    wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;

    const segmentAngle = 360 / players.length;
    const selectedIndex = Math.floor(((randomRotation % 360) + segmentAngle / 2) / segmentAngle) % players.length;

    setTimeout(() => {
      setSelectedPlayer(players[selectedIndex]);
      setIsModalOpen(true);
    }, 4000);
  };

  const generateWheelGradient = () => {
    if (players.length < 1) {
      return "skyblue";
    }
    const segmentAngle = 360 / players.length;
    const colors = players.map(
      (_, i) => `hsl(${(i * 360) / players.length}, 70%, 60%) ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
    );
    return `conic-gradient(${colors.join(', ')})`;
  };

  const splitPlayersIntoColumns = () => {
    const midIndex = Math.ceil(players.length / 2);
    return [
      players.slice(0, midIndex),
      players.slice(midIndex),
    ];
  };

  const laughingEmojis = ['😂','😳', '🙄', '🙏','🥺','🫡','😏', '🤔','😬','😔','🥲','😤','😠','🤨','🫣','🙃', '🤣', '😩','😆', '😅', '😜', '🤭', '🙈', '😝', '😁','🤣😂🤣😂🤣'];

  const getRandomLaughingEmoji = () => {
    return laughingEmojis[Math.floor(Math.random() * laughingEmojis.length)];
  };

  return (
    <div className="app">
      <div className="heading">
        <h1>Truth/Dare</h1>
      </div>

      <div className="wheel-container">
        <div
          className="wheel"
          ref={wheelRef}
          style={{ '--wheel-gradient': generateWheelGradient() }}
          onClick={spinBottle}
        >
          {players.map((player, index) => {
            const segmentAngle = 360 / players.length;
            const angle = segmentAngle * index;
            return (
              <div
                key={index}
                className="segment-label"
                style={{
                  transform: `rotate(${angle}deg) translate(0%, -80%)`,
                  '--text-color': `hsl(${(index * 360) / players.length}, 100%, 20%)`,
                }}
              >
                {/* <b>{player}</b> */}
              </div>
            );
          })}
        </div>

        <div className="bottle-container">
          <div className="bottle-icon">Spin</div>
        </div>
      </div>

      <div className="player-details">
        <h3 className='players-heading'>Players</h3>
        <div className="input-container">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => {
              setNewPlayer(e.target.value);
              setError("");
            }}
            placeholder="Add a player"
            
          />
          <button onClick={addPlayer} className="animated-button"><FaUserPlus fontSize={30}/></button>
        </div>

        <div className="players-list">
          {splitPlayersIntoColumns().map((playerColumn, columnIndex) => (
            <div key={columnIndex} className="player-column">
              {playerColumn.map((player, index) => (
                <div key={index} className="player-item">
                 <FaUser color='#ffdd57'/>  {player}
                  <ImCross className='remove-player' onClick={() => removePlayer(player)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="signature-container">
          <a className="signature" target='_blank' href='https://prudhvi-kollana-portfolio.vercel.app/'>
            <FaHeart size={30} color="red" />
            <img src={signature} alt="Signature" className="inline-block align-middle mx-2" />
          </a>
        </div>

      {isModalOpen && selectedPlayer && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
            <div className="emoji-launch">
              <span className="laughing-emoji">{getRandomLaughingEmoji()}</span>
            </div>
            <h1 className='selected-player'><i>- {selectedPlayer} -</i></h1>
          </div>
        </div>
      )}
      
      {isWarningModalOpen && (
        <div className="warning-modal">
          <div className="warning-modal-content">
            <FaTimes className="close-icon" onClick={() => setIsWarningModalOpen(false)} />
            <h2><RiErrorWarningFill fontSize={80} className='warning'/></h2>
            <h4 className='warning-text'>At least 2 players are required to spin</h4>
          </div>
        </div>
      )}

      {isErrorModalOpen && (
        <div className="warning-modal">
          <div className="warning-modal-content">
            <FaTimes className="close-icon" onClick={() => setIsErrorModalOpen(false)} />
            <h2><IoWarning fontSize={80} className='error'/></h2>
            <h4 className='error-text'>{error}</h4>
          </div>
        </div>
      )}




    </div>
  );
}

export default TruthOrDare;
