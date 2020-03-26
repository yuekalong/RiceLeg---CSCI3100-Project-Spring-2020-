exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chatroom_pair")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("chatroom_pair").insert([
        {
          roomID: "1000",
          username_A: "long",
          useremail_A: "long@email.com",
          username_B: "harry",
          useremail_B: "harry@email.com"
        },
        {
          roomID: "2000",
          username_A: "long",
          useremail_A: "long@email.com",
          username_B: "jane",
          useremail_B: "jane@email.com"
        },
        {
          roomID: "3000",
          username_A: "long",
          useremail_A: "long@email.com",
          username_B: "charlie",
          useremail_B: "charlie@email.com"
        },
        {
          roomID: "4000",
          username_A: "long",
          useremail_A: "long@email.com",
          username_B: "arthur",
          useremail_B: "arthur@email.com"
        }
      ]);
    });
};
