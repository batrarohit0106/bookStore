import neo4j from 'neo4j-driver';

const NEO4J_URI = process.env.NEO4J_URI || 'neo4j+s://3d9cc92b.databases.neo4j.io';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'YE2W4sqefzXLk3nAK_5k3t75BHK0AFRDgqKK4Fbp-Dc';

const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

const createSession = () => driver.session();   
export {driver, createSession}