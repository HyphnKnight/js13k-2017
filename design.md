# js13k 2017: Lost
## Altered
The following is a work in progress.
### Abstract
Mental health is a serious issue plaguing many peoples lives and the vast majority of people don't understand it, I certainly don't. While I was trying to break down the concept of being lost several things jumped to mind: Where is my mind? by the Pixies; and Not all those who wander, are lost by J.R.R. Tolkien. The most prominent of however was the concept of losing one's mind. Being an ignorant layperson when it comes to mental health I did the first thing everyone does when trying to research something, I googled it. This led me down a rabbit hole of medical research on the symptoms and treatment of dissociative identity disorder (DID). This took some time until I finally read a description about alters (short for alternate personality) that seemed to fit perfectly into the character archetypes of JRPGs and later MMOs and WRPGs. They are as follows:

*Descriptions are all from [healthyplace.com](https://www.healthyplace.com/abuse/dissociative-identity-disorder/understanding-dissociative-identity-disorder-alters/)*
- **Child and adolescent alters**: Young alters are often the first discovered in therapy and are the most common type of alter. These alters emerge to handle the abuse that the original personality couldn't tolerate. A DID alter may be referred to as a "little" if the alter acts seven years or younger.
- **Protector or rescuer alters**: These alters can be of any age and were created to save the original person from intolerable situations. These DID alters are often tougher and braver than the original personality.
- **Persecutor alters**: These DID alters are modeled after the abuser. Persecutor alters create negative messages blaming the original identity for the abuse and telling them they need to die or pay for it. Often the host will act on these negative messages and self-harm or even attempt suicide. This is often when the person is first introduced to the mental health system.
- **Perpetrator alters**: Modeled after the abuser, these dissociative identity disorder alters direct their hostility outward rather than inward towards other personalities.
- **Avenger alters**: This dissociative identity disorder alter holds the rage from the childhood abuse and may seek retribution from the abuser. They tend to express the anger of the entire system and can be hostile.

These are a small subset of all the possible alternate personalities a person can have. In truth, it's more like there are general traits of personalities that are mixed and matched to create alters. However, for the sake of simplicity, I decided to use the above alters as they represent the most common examples of alters that appear in people suffering from DID.

As for a story structure, I figured that the treatment process for DID would be a compelling story structure. The traditional method of treatment is one by one attempting to remove alter's until only the original personality remains. This led to patients feeling that they are being attacked or their therapist is attempting to kill parts of them. The modern method of treatment is instead to ally all of the patient's personalities in order to tackle the target of their issue head on. With the ending message being it's not about eliminating the alters as much as it is about dealing with your trauma.

### Narrative
The overall goal of the game is to bring back the original, the alternate personalities believe by combating the traumatic memories they can resurrect the original and restore peace. When they finally defeat the final memory they come to the realization that the original isn't coming back, but that might be fine as being whole isn't as important as being happy.

#### Setting
The Game takes place in the mind of an unnamed person who is suffering from DID. This is not explicitly stated its just the conceptual start point. For the game's narrative to make sense the mind needs to contain locations for the personalities to exist prior to joining the party as well as a location for the fighting of Trauma. A Trauma at its core is just a memory, a memory of incredibly negative power, but still just a memory. The mind could be represented as a field of memories. Each memory belonging to one of the personalities and is only interactable by the personality that created them (if I end up representing them as a pool of water, only the source can see its reflection). The traumatic memories each represented by a special looking memory something that indicates it has been locked away. Each Traumatic memory is also the point of the splitting of a personality. That personality does not exist earlier (does not have memories). As for places of origin, I haven't decided whether they should have one or just exist in the space.

### Mechanics
The goal is to convey as much meaning as possible through mechanics rather than through exposition.

#### General
One of the aspects of DID is that different personalities are in control at different times. To represent this, personalities are randomly removed from the party and no more than one can be removed at a time.

#### Conversation
- Like an ability selection except instead of using abilities you select who talks.

#### Battle
- Takes place a hexagonal game map.
- The player starts as one of the personalities and must go around and either defeat or recruit the other personalities. While challenging theirs.
- Have a shared energy pool the represents their total power.
- The weaker a personality is the stronger the other personalities become. Think of it as a total power pool split among the personalities as a ratio between all of their presence.
- A personality can become suppressed, meaning it hits zero 'presence' and it no longer can act.

##### Alters
Alters have 3 abilities and a passive ability and will sometimes act on their own.
- Child(offense/defense/utility)
  - Passive: *Takes presense damage from energy pool damage.*
  - Regress: *Sacrifice presense to restore pool*
  - Ignore: *Creates a defensive barrier.*
  - Forget: *Remove one enemy from the match for several rounds.*
- Protector(defense/utility)
  - Passive: When pool takes damage gain presence.
  - Shoulder the burden: *Switch places with the target unit.*
  - Renew resolve: *Transfer presence at x2 ratio*.
  - Guardian Angel: *If target takes fatal damage, instead have half that damage apply to the protector.*
- Persecutor(utility/offense)
  - Passive: *Drain presence from all nearby characters.*
  - Abuse: *Attack in a line that can hit allies and enemies deals total damage dealt to allies x 2 to the first enemy hit.*
  - Sap Will: *Drain presence of ally and gain x 1.5.*
  - Self Harm: *Drains energy from the pool to gain presence.*
- Avenger(offense)
  - Passive: *Increase energy pool and presence on suppression of an ally.*
  - Repost: *If attacked deal bonus damage back as a response.*
  - Justify: *Deal damage x number of allies target has damaged this turn.*
  - Avenging Angel: *If last alive refill energy pool and presence.*

### Graphics

### Story

#### Game beats
1. Start as Alter
1. Find another alter
1. Tackle Trauma
1. Find another alter
1. Tackle Trauma
1. Find another alter
1. Tackle Trauma
1. Tackle Final Trauma

#### Game Plot
The child is looking into a memory remembering a wonderful event and talking about it with the original. The original is consumed by a trauma and in her place is another alter, the avenger. The map at this point goes open world with 3 of the 4 traumas being open. The final gate is locked until the other 3 are opened. The final gate is opened and thats the end of the game.

#### The person
This is where to story of the person who's mind the story takes place goes.

### Programming
Notes on programming.
