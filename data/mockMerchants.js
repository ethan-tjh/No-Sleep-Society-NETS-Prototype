// Mock participating merchants for the NETS Loop demo.
// In production this would come from a NETS merchant directory API —
// the shape (id, name, type) is what loopEngine.js actually depends on.

export const merchants = [
    {id: 'merchant_hawker_01', name: 'Ah Seng Hawker Stall', type: 'hawker'},
    {id: 'merchant_convenience_01', name: 'Campus Convenience Store', type: 'convenience'},
    {id: 'merchant_bubbletea_01', name: 'Bubble Tea Corner', type: 'bubble_tea'},
];