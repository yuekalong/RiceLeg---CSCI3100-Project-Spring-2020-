exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chatroom_pair")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("chatroom_pair").insert([
        {
          roomID: "1",
          username_A: "long",
          username_B: "harry"
        },
        {
          roomID: "2",
          username_A: "long",
          username_B: "jane"
        },
        {
          roomID: "3",
          username_A: "long",
          username_B: "charlie"
        },
        {
          roomID: "4",
          username_A: "long",
          username_B: "arthur"
        }
      ]);
    });
};
