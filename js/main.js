const facts = [
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua alice, 10', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '234-5678', true],
    ['joão', 'telefone', '91234-5555', true],
    ['joão', 'telefone', '234-5678', false],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true],
  ];

const schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

function organizeFacts(facts, schema) {
    facts = facts.reverse();
    const entities = extractEntities(facts);
    organizedFacts = [];
    entities.forEach(entity => {
        organizedFacts = organizedFacts.concat(organize(facts.filter(fact => fact[0] === entity), schema));
    });
    return organizedFacts;
}

function extractEntities(facts) {
    let entities = facts.map(fact => fact[0]);
    entities = entities.filter((v, i) => entities.indexOf(v) === i);
    return entities;
}

function organize(facts, schema) {
    filteredFacts = [];
    const removedFacts = facts.filter(fact => fact[3] === false).map(fact => fact[2]);
    facts = facts.filter(fact => !removedFacts.find(rmFact => rmFact === fact[2]));
    schema.forEach(schema => {

        if (schema[0] && schema[0] === 'endereço') {
            if (schema[2] && schema[2] === 'one') {
                filteredFacts = filteredFacts.concat([facts.filter(fact => fact[1] == 'endereço').find(fact => fact[3] === true)]);
            } else {
                filteredFacts = filteredFacts.concat(facts.filter(fact => fact[1] == 'endereço').filter(fact => fact[3] === true));
            }
        }

        if (schema[0] && schema[0] === 'telefone') {
            if (schema[2] && schema[2] === 'one') {
                filteredFacts = filteredFacts.concat([facts.filter(fact => fact[1] == 'telefone').find(fact => fact[3] === true)]);
            } else {
                filteredFacts = filteredFacts.concat(facts.filter(fact => fact[1] == 'telefone').filter(fact => fact[3] === true));
            }
        }
    })
    return filteredFacts;

}

function btnOrganizeOnClick() {
    console.log(organizeFacts(facts, schema));
}

