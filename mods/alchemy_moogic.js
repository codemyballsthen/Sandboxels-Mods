// Sandboxels Custom Mod: Magic & Explosions (Fixed)

// 1. Define Aether
elements.aether = {
    color: ["#8a2be2", "#da70d6", "#ba55d3"],
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.5,
    glow: true,
    reactions: {
        "water": { elem1: null, elem2: "potion" },
        "fire": { elem1: "plasma", elem2: "plasma" }
    }
};

// 2. Define Philosopher's Stone
elements.philosophers_stone = {
    color: "#e60000",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 5000,
    conduct: 1,
    reactions: {
        "iron": { elem1: "philosophers_stone", elem2: "gold" },
        "copper": { elem1: "philosophers_stone", elem2: "gold" },
        "lead": { elem1: "philosophers_stone", elem2: "gold" }
    }
};

// 3. Define Potion
elements.potion = {
    color: "#00ffcc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10
};

// 4. Mana Crystal (Fixed growth logic)
elements.mana_crystal = {
    color: ["#0000ff", "#1e90ff%", "#00ffff%", "#4169e1"],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 3000,
    tempHigh: 500,
    stateHigh: "magma",
    reactions: {
        "fire":   { elem1: "explosion", elem2: "explosion" },
        "plasma": { elem1: "explosion", elem2: "explosion" },
        // Aether is now CONSUMED (null) instead of replaced — growth happens in tick()
        "aether": { elem1: "mana_crystal", elem2: null, chance: 0.1 }
    },

    // tick() runs every frame for each mana_crystal pixel
    tick: function(pixel) {
        // Only attempt growth 2% of the time to keep it slow and natural
        if (Math.random() > 0.02) return;

        // Check all 4 cardinal neighbors
        const neighbors = [
            { x: pixel.x,     y: pixel.y - 1 }, // up
            { x: pixel.x,     y: pixel.y + 1 }, // down
            { x: pixel.x - 1, y: pixel.y     }, // left
            { x: pixel.x + 1, y: pixel.y     }, // right
        ];

        for (const n of neighbors) {
            const neighbor = pixelMap[n.x]?.[n.y];
            // Grow into aether neighbors only
            if (neighbor && neighbor.element === "aether") {
                changePixel(neighbor, "mana_crystal");
                return; // Only grow one pixel per tick
            }
        }
    }
};

// 5. Refresh UI if injected via console
if (typeof initUI === "function") {
    initUI();
}
