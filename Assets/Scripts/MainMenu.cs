using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI () {
		GUIStyle customButton = new GUIStyle("button");
		customButton.fontSize = 60;
		//customButton.font = Resources.Load;
		
		GUIStyle customLabel = new GUIStyle("label");
		customLabel.fontSize = 60;
		//customLabel.font = Resources.Load(Fon;

		//Make gui text
		GUI.Label(new Rect(Screen.width/2, 200,200,200), "Augmeal", customLabel);

		//Make the start button
		if(GUI.Button(new Rect(Screen.width/2,Screen.height/2,200,200), "Start", customButton)) {
			Application.LoadLevel("arscene");
		}


	}
}
