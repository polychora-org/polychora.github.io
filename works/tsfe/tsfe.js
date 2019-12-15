var quotes = ["Madame Sosostris, famous clairvoyante,\n" + 
"Had a bad cold, nevertheless\n" +
"Is known to be the wisest woman in Europe,\n" +
"With a wicked fucking pack of cards.",

"&ldquo;You gave me hyacinths first a year ago;\n"+
"They called me the fucking hyacinth girl.&rdquo;",

"I will show you fear in a handful of fucking dust.",

"Summer surprised us, coming over the Starnbergersee\n"+ 
"With a shower of rain; we stopped in the colonnade,\n"+
"And went on in sunlight, into the Hofgarten,\n"+
"And drank coffee, and talked for a fucking hour.",

"Unreal Fucking City",

"You! hypocrite fucking lecteur!&ndash;mon semblable,&ndash;mon fr&egrave;re!",

"Go, go, go, said the bird: human kind\n"+
"Cannot bear very much fucking reality.",

"A periphrastic study in a fucking worn-out  poetical fashion",

"For most of us, there is only the unattended\n" +
"Moment, the moment in and out of time,\n" +
"The distraction fit, lost in a shaft of sunlight,\n" +
"The wild thyme unseen, or the winter lightning\n" +
"Or the waterfall, or music heard so deeply\n" +
"That it is not heard at all, but you are the music\n" +
"While the music lasts.\n<br/>" +
"fuck what a good poem",

"Huge sea-wood fed with copper\n" +
"Burned green and orange, framed by the coloured stone,\n" +
"In which sad light a carv&egrave;d fucking dolphin swam.",

"O O O O that Shakespeherian Rag-\n" +
"It's so fucking elegant",

"HURRY UP PLEASE IT'S FUCKING TIME",

"Goonight Bill. Goonight Lou. Goonight May. Goonight.\n" +
"Ta ta. Goonight. Goonight.\n" +
"Good night, ladies, good night, sweet ladies, good night, good fucking night.",

"By the waters of Leman I sat down and wept...\n"+	 
"Sweet Thames, run softly till I end my fucking song.",

"I Tiresias, old man with wrinkled fucking dugs",

"(And I Tiresias have foresuffered all\n" +
"Enacted on this same fucking divan or bed;",

"On Margate Sands.\n" +
"I can connect\n" +
"Nothing with fucking nothing.",

"Burning burning burning burning\n" + 
"O Lord Thou pluckest me out\n" +
"O Lord Thou pluckest\n<br/>\n" +
"fucking burning",

"Who is the third who walks always beside you?\n" +
"When I count, there are only you and I together\n" +
"But when I look ahead up the white road\n" +
"There is always another one walking beside you\n" +
"Gliding wrapt in a brown mantle, hooded\n" +
"I do not know whether a man or a woman\n" +
"-But who is that on the other fucking side of you?\n<br/>seriously",

"&ldquo;My nerves are bad tonight. Yes, bad. Stay with me.\n" + 
"Speak to me. Why do you never speak? Speak.\n" +
"What are you fucking with? What fucking? What?\n" +
"I never know what you are fucking. Fuck.&rdquo;",

"Fuck fuck fuck\n" +
"Jug jug jug jug jug jug",

"Inexplicable fucking splendour of Ionian white and gold.",

"Let us go then, you and I,\n" +
"When the evening is spread out against the sky\n" +
"Like a patient fucking <a href='http://www.youtube.com/watch?v=lX_vI-3yu-Q'>etherized</a> upon a table",

"Streets that follow like a tedious argument\n" +
"Of insidious intent\n" +
"To lead you to an overwhelming question...\n" +
"Oh, do not ask, &ldquo;What is it?&rdquo;\n" +
"Let us go and make our fucking visit.",

"In the room the women come and go\n" +
"Talking of fucking Michelangelo.",

"Do I dare\n" +
"Disturb the universe?\n" +
"In a minute there is time\n" +
"For decisions and revisions which a minute will fucking reverse.",

"&ldquo;That is not it at all,\n" +
"That is not what I fucking meant, at all.&rdquo;",

"Shall I part my hair behind? Do I dare to eat a peach?\n" +
"I shall wear white flannel trousers, and walk upon the beach.\n" +
"I have heard the mermaids singing, each to each.\n<br/>"+
"I do not think that they will fucking sing to me.",

"We have lingered in the chambers of the sea\n" +
"By sea-girls wreathed with seaweed red and brown\n" +
"Till human voices wake us, and we fucking drown.",

"We are the hollow men\n" +
"We are the stuffed men\n" +
"Leaning together\n" +
"Headpiece filled with straw. Fuck!",

"A crowd flowed over London Bridge, so many,\n" + 
"I had not thought death had undone so fucking many.",

"Oh keep the Dog far hence, that's friend to men,\n" +
"Or with his nails he'll fucking dig it up again!",

"Thank you. If you see dear Mrs. Equitone,\n" +
"Tell her I bring the horoscope myself:\n" +
"One must be so fucking careful these days.",

"Yet when we came back, late, from the Hyacinth garden,\n" +
"Your arms full, and your hair wet, I could not\n" +
"Speak, and my eyes failed, I was neither\n"+
"Living nor dead, and I knew nothing,\n" +
"Looking into the heart of light, the silence.\n" +
"&Ouml;d' und leer das Fucken Meer.",

"That corpse you planted last year in your garden,\n" +
"Has it begun to fucking sprout?",

"The river bears no empty bottles, sandwich papers,\n" +
"Silk handkerchiefs, cardboard boxes, cigarette ends\n" +
"Or other testimony of summer nights. The nymphs are fucking departed.",

"Sightless, unless\n" +
"The eyes reappear\n" +
"As the perpetual star\n" +
"Multifoliate rose\n" +
"Of death's twilight kingdom\n" +
"The hope only\n" +
"Of fucking empty men.",

"Here we go round the prickly pear\n" +
"Prickly pear prickly pear\n" +
"Here we go round the prickly pear\n" +
"At five o'clock in the fucking morning jfc",

"Life is very fucking long",

"She turns and looks a moment in the glass,\n" +
"Hardly aware of her departed lover;\n" +
"Her brain allows one half-formed thought to pass:\n" +
"&ldquo;Well now that's done: and I'm fucking glad it's over.&rdquo;"

];

function setQuote() {
	var quote = quotes[Math.floor(Math.random()*quotes.length)];
	quote = "<p>" + quote.split("\n").join("</p><p>") + "</p>";
	document.getElementById("quote").innerHTML = quote;
}