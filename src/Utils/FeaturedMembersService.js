/**
 * Featured Members Service - Frontend
 * Fetches featured team members from Firebase
 */

import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

const FEATURED_MEMBERS_COLLECTION = 'featuredMembers';

/**
 * Get the featured members list from Firebase
 * Fetches member IDs from featuredMembers collection and gets full data from researchers collection
 */
export const getFeaturedMembers = async () => {
  try {
    // Get the featured member IDs in order
    const docRef = doc(db, FEATURED_MEMBERS_COLLECTION, 'active');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return [];
    }

    const memberIds = docSnap.data().memberIds || [];

    if (memberIds.length === 0) {
      return [];
    }

    // Fetch full member data from researchers collection in order
    const featuredMembers = [];
    for (const memberId of memberIds) {
      const memberRef = doc(db, 'researchers', memberId);
      const memberSnap = await getDoc(memberRef);
      if (memberSnap.exists()) {
        featuredMembers.push({
          id: memberId,
          ...memberSnap.data(),
        });
      }
    }

    return featuredMembers;
  } catch (error) {
    console.error('Error fetching featured members:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};
