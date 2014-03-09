using UnityEngine;
using System.Collections;

public class Foursquare : MonoBehaviour {

	string API_URL = "https://api.foursquare.com/v2/";
	string CLIENT_ID = "Q51UZPWJYINNZ4X1WLYQCDDUWKYLCGPN3ZMM2NMKVIY25G5H";
	string CLIENT_SECRET = "0P2QMRFKXKZWTBN2GVB3R2GSM20Q3R0VRWPXMIC1FOGUJXHA";
	string GET = "GET";

	// Use this for initialization
	void Start () {
		print (nearByVenue("-11.20141,34.00959"));
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	string nearByVenue(string coordinate )
	{
		string path = "venues/search";
		string version = "20140222";

		string url = "";
		url = API_URL + path + "?" + "ll=" + coordinate 
						+ "&" + "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v="
						+ version;
		return (url);
	}
	
}
