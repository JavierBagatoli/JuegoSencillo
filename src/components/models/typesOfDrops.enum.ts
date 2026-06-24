const typesOfDrop ={
    none: "none",
    metal: "metal",
    circuit: "circuit",
    cores: "cores",
    crystal: "crystal"
} as const;

export type TypesOfDrop = typeof typesOfDrop[keyof typeof typesOfDrop];