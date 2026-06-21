import { execSync } from "child_process";


const command = process.argv[2];

const args = "--config src/config/config.cjs --migrations-path src/database/migrations --seeders-path src/database/seeders --models-path src/app/model";

const commands = {
  "migrate": `npx --yes sequelize-cli db:migrate ${args} --env development`,
  "migrate:undo": `npx --yes sequelize-cli db:migrate:undo:all ${args} --env development`,
  "seed": `npx --yes sequelize-cli db:seed:all ${args} --env development`,
  "seed:undo": `npx --yes sequelize-cli db:seed:undo:all ${args} --env development`,
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