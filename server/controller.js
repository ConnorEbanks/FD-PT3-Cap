require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists crossPlay;
        drop table if exists videoGame;


            create table videoGame (
                game_id serial primary key, 
                game_name varchar
            );

            create table crossPlay (
                cross_play serial primary key,
                game_id serial not null references videoGame(game_id)
            );

            insert into videoGame (game_name)
            values ('Minecraft'),
            ('Animal Crossing'),
            ('Horizon: Zero Dawn'),
            ('Apex Legends'),
            ('Rocket League'),
            ('Warzone'),
            ('Fortnite'),
            ('Halo');
            
            insert into crossPlay (game_id)
            select game_id from videoGame where game_name in ('Apex Legends', 'Warzone', 'Fortnite', 'Rocket League');
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
  getAllGames: (req, res) => {
    sequelize
      .query(`select * from videoGame`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getCrossPlayGames: (req, res) => {
    sequelize
      .query(
        `select * from crossPlay join videoGame on crossPlay.game_id = videoGame.game_id`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  addGame: (req, res) => {
    let { game_name, cross } = req.body;
    sequelize.query(
        `insert into videoGame(game_name)
                values('${game_name}')
                returning *`
      )
      if (cross){
        sequelize.query(
            `insert into crossPlay(game_id)
                    select game_id from videoGame where game_name = '${game_name}'`
          )
          .then((dbRes) => res.status(200).send('You added a game'))
          .catch((err) => console.log(err));
          return
    }
    res.status(200).send('You added the game')
  },

  randomGame: (req, res) => {
    sequelize
      .query(`select game_name from videoGame
      order by random()
      limit 1`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};