import spaceHuman from '../../assets/ships/Humans.png'
import spaceHuman_2 from '../../assets/ships/Humans_2.png'
import spaceHuman_3 from '../../assets/ships/Humans_3.png'
import spaceAnulaki from '../../assets/ships/Anulaki.png'

export interface CapitalShip {
    img: any,
    id: number,
    zone: number,
    name: string,
    owner: string,
    description: string,
    levels: {
        towers: number,
        defense: number,
        sensors: number,
    }}

export const CAPITAL_SHIPS: CapitalShip[] = [{
    id:0,
    zone: 0,
    name: 'Morning Start',
    owner: 'Jab',
    description: 'Esta es la primera nave',
    img: spaceHuman,
    levels: {
        towers: 0,
        defense: 0,
        sensors: 0,
    }},{
    id:1,
    zone: 1,
    name: 'Domms space',
    owner: 'No Jab',
    description: 'Esta es la primera nave',
    img: spaceHuman_2,
    levels: {
        towers: 0,
        defense: 0,
        sensors: 0,
    }},{
    id:2,
    zone: 0,
    name: 'Civil world',
    owner: 'Jab',
    description: 'Esta es la primera nave',
    img: spaceHuman_3,
    levels: {
        towers: 0,
        defense: 0,
        sensors: 0,
    }},{
    id:3,
    zone: 3,
    name: 'Ends Days',
    owner: 'Jab',
    description: 'Esta es la primera nave',
    img: spaceAnulaki,
    levels: {
        towers: 0,
        defense: 0,
        sensors: 0,
    }}, 
]