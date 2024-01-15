import React, { useState, useEffect, useRef } from "react";
import "./ChipComponent.css";

const mockData = [
  {
    name: "Chadwick Ayre",
    email: "cayre0@cam.ac.uk",
    img_src: "https://robohash.org/corporisquiaperiam.png?size=50x50&set=set1",
  },
  {
    name: "Abrahan Seabrocke",
    email: "aseabrocke1@ocn.ne.jp",
    img_src: "https://robohash.org/autiuredistinctio.png?size=50x50&set=set1",
  },
  {
    name: "Nathanael Laye",
    email: "nlaye2@typepad.com",
    img_src: "https://robohash.org/dolorumsedut.png?size=50x50&set=set1",
  },
  {
    name: "Luigi Balcers",
    email: "lbalcers3@reverbnation.com",
    img_src: "https://robohash.org/eumaliquamest.png?size=50x50&set=set1",
  },
  {
    name: "Adam Gurg",
    email: "agurg4@xrea.com",
    img_src: "https://robohash.org/nemolaborumquis.png?size=50x50&set=set1",
  },
  {
    name: "Kev Haitlie",
    email: "khaitlie5@booking.com",
    img_src: "https://robohash.org/nonestnon.png?size=50x50&set=set1",
  },
  {
    name: "Reinhard Royl",
    email: "rroyl6@sun.com",
    img_src: "https://robohash.org/nobisvelquasi.png?size=50x50&set=set1",
  },
  {
    name: "Nonah Kilmartin",
    email: "nkilmartin7@washington.edu",
    img_src: "https://robohash.org/eosquodoloremque.png?size=50x50&set=set1",
  },
  {
    name: "Clo Falkinder",
    email: "cfalkinder8@mysql.com",
    img_src: "https://robohash.org/velitinaccusantium.png?size=50x50&set=set1",
  },
];

function ChipComponent() {
  const [items, setItems] = useState(mockData);
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [highlightedChipIndex, setHighlightedChipIndex] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    setFilteredItems(
      items.filter(
        (item) =>
          !chips.some((chip) => chip.email === item.email) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chips, items]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addChip = (item) => {
    setChips([...chips, item]);
    setInputValue("");
  };

  const removeChip = (chipToRemove) => {
    setChips(chips.filter((chip) => chip.email !== chipToRemove.email));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "") {
      if (highlightedChipIndex == null && chips.length > 0) {
        setHighlightedChipIndex(chips.length-1);
      } else {
        const lastChip = chips[chips.length - 1];
        removeChip(lastChip);
        setHighlightedChipIndex(null)
      }
    }
  };

  return (
    <div className="chip-flex">
      <div className="chip-buttons-flex">
        {chips.map((chip, i) => (
          <div
            key={chip.email}
            className={"chip " + (i == highlightedChipIndex && "active-chip")}
          >
            <img src={chip.img_src} alt="" />
            <p>{chip.name} </p>
            <button onClick={() => removeChip(chip)}>X</button>
          </div>
        ))}
      </div>
      <div className="search">
        <input
          ref={inputRef}
          type="text"
          className="input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {inputValue && filteredItems.length > 0 && (
          <div className="suggestions">
            {filteredItems.map((item) => (
              <div key={item.email} onClick={() => addChip(item)}>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChipComponent;
