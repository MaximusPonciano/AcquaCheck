import { execSync } from "child_process";


const command = process.argv[2];

const commands = {
  "migrate": "npx sequelize-cli db:migrate",
  "migrate:undo": "npx sequelize-cli db:migrate:undo:all",
  "seed": "npx sequelize-cli db:seed:all",
  "seed:undo": "npx sequelize-cli db:seed:undo:all",
};

if (!command || !commands[command]) {
  console.log("\nComandos disponíveis:");
  Object.keys(commands).forEach((cmd) => {
    console.log(`  node command.js ${cmd}`);
  });
  console.log("");
  process.exit(1);
}

try {
  execSync(commands[command], { stdio: "inherit" });
  console.log(`\n✓ "${command}" executado com sucesso.\n`);
} catch {
  console.error(`\n✗ Falha ao executar "${command}".\n`);
  process.exit(1);
}