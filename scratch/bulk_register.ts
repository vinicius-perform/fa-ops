import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dpuxzvhhymceylqsjecr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdXh6dmhoeW1jZXlscXNqZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzA2MTYsImV4cCI6MjA5MTEwNjYxNn0.cA7UbW1dcQh-xLDh_EW9yMFLz-ziPHxDGPxyyHw7A4k';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const membersMap = {
  "Wilhian": "9e910ad0-1bfb-4d77-adc9-d0f1c617ddcf",
  "Sidney": "f9e7a229-8694-4e39-8210-86aa685b0d3e",
  "Sara": "dfb49866-62e9-464d-bb6e-8cfba128a30c",
  "Clara": "dc3cada4-4716-43a0-829c-f3ce12f87b63",
  "Rafael": "943eeeb2-945b-4b9a-bc16-f578c928b85e",
  "Vitor": "d3027477-bfeb-4d92-bc61-e2c8db77912a",
  "Gabriele": "aca0173c-aec3-414d-9f28-834569321449",
  "Jhonattan": "c328e8be-a37f-4226-8b4d-65505f2fede8",
  "Alan": "7318a248-7214-485b-9477-751f7afb418b"
};

const clientsToRegister = [
  { name: "Rodrigo Vieira", team: ["Wilhian", "Gabriele", "Alan", "Vitor"] },
  { name: "Dr Pedro Lima", team: ["Jhonattan"] },
  { name: "Dr Rodrigo Coelho", team: ["Sidney", "Sara", "Rafael", "Vitor"] },
  { name: "Doutor Cris", team: ["Wilhian", "Alan"] },
  { name: "Dr Fernando Silveira", team: ["Sara", "Wilhian", "Rafael", "Vitor"] },
  { name: "Dra Marcela Fiel", team: ["Jhonattan"] },
  { name: "Dr Jair Dacas", team: ["Wilhian", "Gabriele", "Alan", "Vitor"] },
  { name: "Dr Leonardo Silvestrini", team: ["Jhonattan", "Gabriele", "Alan", "Vitor"] },
  { name: "Dra Paola", team: ["Jhonattan", "Gabriele", "Alan"] },
  { name: "Dr André", team: ["Sara", "Rafael", "Wilhian", "Vitor"] },
  { name: "Dr Derlis", team: ["Sidney", "Clara", "Rafael"] },
  { name: "Dra Mariella", team: ["Sidney", "Sara", "Rafael", "Vitor"] },
  { name: "Dr Kleison", team: ["Wilhian", "Gabriele", "Alan"] },
  { name: "Dr Thiago Salla", team: ["Sidney", "Gabriele", "Alan"] }
];

async function run() {
  console.log("Starting bulk registration...");

  // Fetch all members to get current counts/names
  const { data: currentMembers } = await supabase.from('team_members').select('*');
  if (!currentMembers) {
    console.error("Could not fetch members");
    return;
  }

  const memberData = currentMembers.reduce((acc, m) => {
    acc[m.id] = {
      assigned_clients: m.assigned_clients || 0,
      assigned_client_names: m.assigned_client_names || []
    };
    return acc;
  }, {});

  for (const client of clientsToRegister) {
    const initials = client.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const teamIds = client.team.map(name => membersMap[name]).filter(id => id);
    
    const dbClient = {
      name: client.name,
      niche: "Medical / Legal", // Default
      monthly_fee: 1500, // Default
      status: "active",
      priority: "medium",
      team: teamIds,
      entry_date: new Date().toLocaleDateString(),
      pending_actions: 0,
      last_analysis: "Never",
      logo_color: "bg-primary",
      initials
    };

    console.log(`Registering client: ${client.name}...`);
    const { data: insertedClient, error: clientError } = await supabase.from("clients").insert([dbClient]).select();
    
    if (clientError) {
      console.error(`Error adding client ${client.name}:`, clientError.message);
      continue;
    }

    // Update team members
    for (const memberId of teamIds) {
      const current = memberData[memberId];
      current.assigned_clients += 1;
      current.assigned_client_names.push(client.name);

      const { error: updateError } = await supabase
        .from("team_members")
        .update({ 
          assigned_clients: current.assigned_clients, 
          assigned_client_names: current.assigned_client_names 
        })
        .eq("id", memberId);
      
      if (updateError) {
        console.error(`Error updating member ${memberId}:`, updateError.message);
      }
    }
  }

  console.log("Bulk registration completed!");
}

run();
