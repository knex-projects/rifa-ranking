# Rifa Ranking

Displays how the company's Sellers compare in selling Tickets for a Raffle, highlighting the top three on a Podium and listing everyone else below.

## Language

### Raffle

**Raffle**:
The one-time company campaign in which numbered Tickets are sold to the public, ending in a draw. There is only ever one Raffle.
_Avoid_: Rifa (in code/docs), campaign, event

**Ticket**:
One numbered entry in a Raffle; the unit a Seller is ranked by.
_Avoid_: Item, number, bilhete, cota

**Seller**:
A member of the company who sells Tickets to the public and appears in the Ranking.
_Avoid_: Vendor (implies a supplier), salesman, vendedor

**Seller ID**:
The identifier recorded for each Seller in the Sales Sheet; a row without one is not a Seller and is ignored.
_Avoid_: Row number, index

**Full Name**:
A Seller's complete name as recorded in the Sales Sheet (e.g. "Carlos Eduardo Amaro de Sousa Franco de Sá"); unique per Seller.
_Avoid_: Participant, participante

**Display Name**:
The first two words of a Seller's Full Name (e.g. "Carlos Eduardo", "Alessandro Viana"), as shown in the Ranking. When the second word is a particle (da, das, de, do, dos, e), the word after it is included too (e.g. "Lorena dos Santos").
_Avoid_: Username, nickname

**Photo Name**:
The name of a Seller's photo file (e.g. "alessandro", "ana-vitoria"), recorded next to their Full Name in the Sales Sheet. A Seller without a matching photo is shown by their initials.
_Avoid_: Photo, image, avatar, slug

### Ranking

**Sales Sheet**:
The shared spreadsheet where the team records each Seller's Seller ID, Full Name, Photo Name and Tickets Sold; the single source of truth for the Ranking.
_Avoid_: Spreadsheet, database, planilha

**Tickets Sold**:
The quantity recorded for a Seller in the Sales Sheet; the score the Ranking is ordered by. A blank or non-numeric quantity counts as zero.
_Avoid_: Sales, score, total

**Team Total**:
The sum of every Seller's Tickets Sold.
_Avoid_: Total sales, grand total

**Ranking**:
Every Seller in the Sales Sheet, including those with zero Tickets Sold, ordered by Tickets Sold (highest first) and then alphabetically by Display Name.
_Avoid_: Leaderboard, scoreboard

**Position**:
A Seller's place in the Ranking, starting at 1. Sellers with equal Tickets Sold share the same Position, and the next Position skips past them (1, 2, 2, 4).
_Avoid_: Rank, place

**Podium**:
Every Seller in Positions 1 to 3 with at least one Ticket Sold, shown with special emphasis; ties can put more than three Sellers on it, and it is empty until someone sells.
_Avoid_: Top 3, winners

**Field**:
Every Seller in the Ranking not on the Podium, including everyone with zero Tickets Sold, shown as a plain list.
_Avoid_: Remaining list, others, rest

**Last Checked**:
The moment the Ranking was last read from the Sales Sheet; not the moment the Sales Sheet was last edited, which is unknown.
_Avoid_: Last updated, last edit
